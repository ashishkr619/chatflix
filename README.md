## Motivation & Story
Trying to learn react,this is a running commentary of me building chatflix using React & Ably.Chatflix is a place to talk about your favorite neflix shows. The project uses React & Ably's pub/sub capabilities for realtime communication .

## Final Product we are aiming at
The final product we are building in the first version will be a very simple one.Ability to chat into any room(shows) of your choice.One nice feature we will be trying to add in the first version is the ability to react to any particular chat message.
Due to lack of time we will not be adding any database or server side logic as of now.So we will be using Ably's persist message capability to store all of our chat messages as of now for 24-72 hours.Later we might use Django & Postgres.Images of final product will be updated here everytime we reach one milestone of our development.


## Step 1 Create a new react app & figure out all the components in our App
```python
npm install -g create-react-app  #If you don't have react installed on your computer
npx create-react-app chatflix #your fresh  new application
cd chatflix #now we are inside chatflix
npm start #fireup the server
```
Since react is all about breaking webpages into components, lets figure out the components we will be needing ,we might break them up further if required. So inside **App.js**

**<RoomList/>** *to show us all the rooms/shows we can join*
**<MessageList/>**  *the actual messaging area*
**<CreateRoom/>**  *the ability to create new rooms for new shows*
**<SubmitMessageForm/>** *the chat submit area*

I added the css styles and the ably installations which were pretty easy to do yourself, so no explanation here.

The code until [Step 1](https://github.com/ashishkr619/chatflix/tree/851b88b221c5fa114d98e5642a458181508ab7df)
