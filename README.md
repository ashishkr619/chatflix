## Motivation & Story
Trying to learn react,this is a running commentary of me building chatflix using React & Ably.Chatflix is a place to talk about your favorite neflix shows. The project uses React & Ably's pub/sub capabilities for realtime communication .

## Final Product we are aiming at
The final product we are building in the first version will be a very simple one.Ability to chat into any room(shows) of your choice.One nice feature we will be trying to add in the first version is the ability to react to any particular chat message.
Due to lack of time we will not be adding any database or server side logic as of now.So we will be using Ably's persist message capability to store all of our chat messages as of now for 24-72 hours.Later we might use Django & Postgres.Images of final product will be updated here everytime we reach one milestone of our development.


## Step 1 -Create a new react app & figure out all the components in our App
```python
npm install -g create-react-app  #If you don't have react installed on your computer
npx create-react-app chatflix #your fresh  new application
cd chatflix #now we are inside chatflix
npm start #fireup the server
```
Since react is all about breaking webpages into components, lets figure out the components we will be needing ,we might break them up further if required. So inside **App.js**

**RoomList** to show us all the rooms/shows we can join
**MessageList**  the actual messaging area
**CreateRoom**  the ability to create new rooms for new shows
**SubmitMessageForm** the chat submit area

I added the css styles and the ably installations which were pretty easy to do yourself, so no explanation here.

The code until [Step 1](https://github.com/ashishkr619/chatflix/tree/bfe8e851268c3e4fcc927571299ed635b9e4987f)

## Step 2 - Let's start with the MessageList component

MessageList(or the actual messaging area).To build MessageList we will need to send messages from **App.js** down to the **MessageList Component**.To do so we will use props,

```
<MessageList messages={this.state.messages}/> // in the App.js
```

Down in the Messagelist component **MessageList.js** we receive the list of all messages from **App.JS**, break them down one by one using map function and further send individual message to **Message** component
```
<div className='message-list'>
                {this.props.messages.map((message, i) => (
					<Message key={i} message={message} />
				))}
</div>
```
Inside **Message.js**
just receive the props and display them
```
...
        return(
            <div className='message'>
                <div className='message-text' key={this.props.key}>{this.props.message}</div>
            </div>
...

```
Let's send some random messages from **App.js** to verify our working

```
...
 constructor(){
    super()
    this.state={
      messages:['hello boss','how are you'], // all the messages
      rooms:[], // all the rooms

    }
  }
...
```
![](src/screenshots/step2.png)

The code until [Step 2](https://github.com/ashishkr619/chatflix/tree/825a4147ffc9a827f9268bf20c0eb0e2e2533912)

## Step 3- The SubmitMessgeForm component
Form elements have their own internal states based upon user inputs(eg:when i type something the element needs to keep a track of what i am typing),but since we already know that we want to keep the internal state of an element in this.state,and if we would rather control the content of a component , in the component's state we get a single source of truth and the application becomes less prone to bugs. So let's take whatever the user inputs and store them into the this.state

Inside **SubmitMessgeForm.js** 
We listen to whatever user types by adding onChange event listener to our form component, and then update state via the handleChange method.

```
...
class SubmitMessageForm extends Component {
	constructor(props){
	super(props)
	this.state ={
		message :''
	}
	this.handleChange = this.handleChange.bind(this)//binds the handleChange to a component's instance

	}
	
	handleChange(e){
		this.setState({
			message :e.target.value

		})

	}

	render() {
		console.log(this.state.message)// this confirms that we are now getting form data via this.state,so we can use it anyhow we want,lets use this to update value of the input field
		return (
			<form className="send-message-form">
				<input
					type="text"
					onChange={this.handleChange}
                    value={this.state.message}
					placeholder="type a message and hit Enter..."
				/>
			</form>
		);
	}
}

...

```

Finally we add onSubmit to our form element to submit our message 

```
...
	handleSubmit(e){
		e.preventDefault()
		console.log(this.state.message)
		//connect to ably and send the actual message(this.state.message) in next step

	}

...

```
![](src/screenshots/step3.png)

The code until [Step 3](https://github.com/ashishkr619/chatflix/tree/20073dd3754ee04b2552e74a56fee71f99358a8c)

## Step 4- Sending Message & Displaying Sent Messages (The Concept of Inverse Data Flow in React)
Let's now connect to Ably and broadcast our message.
In SubmitMessageForm.js we send our message to ably

```
	handleSubmit(e){
		e.preventDefault()
		console.log(this.state.message)
		const messageObject= this.state.message 
		//connect to ably and send the actual message(this.state.message) in next step
		/*global Ably*/
		const channel = Ably.channels.get('vikings');
		channel.publish('add_comment', messageObject, err => {
			if (err) {
			  console.log('Unable to publish message; err = ' + err.message);
			}
		  });
		
		  // Clear input fields
		e.target.elements.message.value = '';
		
		}  
...
```
In App.js 
to receive and display messsages we need to do two work
1. we fetch all previous messages on page reload (so we will use componentdidMount to make the api connection and fetch all messages)
2.we fetch the message the user is typing and then render on the same the page


2.fetch the message the user is typing and then render on the same the page
We already know that data flows in one direction inside the react app from app.js(parent) to smaller(child) components, but this is a different case, we need the data from SubmitMessageForm (smaller/child component) to App.js(higher/parent component).The App.js then receives the message and send it to MessageList Component so that it can render it.

**The Concept of Inverse Data Flow in React**
When data flows back from the child component to parent component.

To achieve this we create a function displayMessage in App.js and hook this function into SubmitMessageFormComponet so that on successful  message submit ,we instantly catch it and re-render it on the ui

Inside App.js
```
displayMessage(message){
// get the single message,concat to list of messages
this.setState({
    messages:[...this.state.messages,message] // a way of concating
})

}
or another way to write
displayMessage(message){
// get the single message,concat to list of messages
this.setState(prevState=>{
    return{
        messages:prevState.messages.concat(message)
    }
})

}

```
Inside 

```

	handleSubmit(e){
		e.preventDefault()
		console.log(this.state.message)
		const messageObject= this.state.message
		//connect to ably and send the actual message(this.state.message) in next step
		/*global Ably*/
		const channel = Ably.channels.get('vikings');
		channel.publish('add_comment', messageObject, err => {
			if (err) {
			  console.log('Unable to publish message; err = ' + err.message);
			}
			else{

			// on successful submission to ably instantly update the ui(the hook)
			this.props.displayMessage(messageObject)

			}
		  });
		
		  // Clear input fields
		e.target.elements.message.value = '';
		
		}  
```

1.fetch all previous messages on page reload (so we will use componentdidMount to make the api connection and fetch all messages)
```
componentDidMount() {
    /*global Ably*/
    const channel = Ably.channels.get('persistedmessage:vikings');
  
    channel.attach();
      channel.once('attached', () => {
        channel.history((err, page) => {
          // create a new array with comments only in an reversed order (i.e old to new)
          const messages = Array.from(page.items, item => item.data)
  
          this.setState({messages }); 
        });
      });
  }

  ```
  ![](src/screenshots/step4.png)

The code until [Step 3](https://github.com/ashishkr619/chatflix/tree/20073dd3754ee04b2552e74a56fee71f99358a8c)