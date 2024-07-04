## Stonks Assignment

### Technologies used

- Frontend: NextJS
- Backend: Supabase
- Deployed the application on vercel:- https://stonks-deploy.vercel.app/
- For sending emails I have used resend, although it's not working properly because of their new updation

## Database Schema

<a href="https://dbdiagram.io/d/66865f299939893dae06cee7" target="_blank">
    <img src="https://github.com/arpit5492/Stonks-Assignment/assets/48523103/ad531656-7827-4af3-9df6-a6c13fba081c" alt="db-schema">
</a>

## Prequesites

- Make sure that Node.js and npm are installed in your machine

## Run locally

1. **Clone the repository**

```
git clone https://github.com/arpit5492/Stonks-Assignment.git
```

2. **Navigate to the application directory**

```
cd Stonks-Assignment/
```

3. **\*Install all the dependencies**

```
npm install
```

4. **To start the development server**

```
npm run dev
```

5. **To start the production server**

```
npm run build
```

6. **To run the application after build is successfully completed**

```
npm start
```

7. **To view the database schema queries**

```
cd Stonks-Assignment/db-schemas/init.sql
```

8. **Access the application**

- Open your browser and visit `http://localhost:3000` to view the application

### Stonks Deploy Github

- Link:- https://github.com/arpit5492/stonks-deploy

### Functionalities performed

- Guests:

  - Can see a list of channels (profiles) --> **Done**
  - Can go on channel page and follow the channel --> **Done**
  - If user click on follow and is not connected will ask login --> **Done**

- Connected users (eddy)

  - Eddy connect with his google account --> **Done**
  - Eddy need to complete his profile by setting his username and notification preferences --> **Done, Here make sure to tick the checkbox, else you won't be able to start streaming.**
  - Once connected and profile completed
    - eddy goes to his channel and start streaming (no need to do encoding stuff - just put a button that trigger a boolean and integrate an iframe of this video https://www.youtube.com/watch?v=jfKfPfyJRdk when the boolean is true for frontend) --> **Done, You can also see on the home page, if the channel is offline or live.**

- Connected users (Nico)
  - Nico follow eddy --> **Done**
  - If eddy start a streaming, Nico receive a push notification or an email if he’s not connected to the website. --> **Done. I have written the logic for this, but there some updations on Resend which made it difficult to send emails to the channel's followers.**
  - Nico can go on Eddy’s stream and start chatting (basic) --> **Done. I have implemented an unidirectional way of sending messages i.e after every response, the connection is automatically closed. I haven't got time to implement bi-directional way of sending messages i.e using websockets.**

**Bonus**

- i18n integration:- **I don't know exactly how can I implement this.**
- Emojis linked to a channel:- **I haven't got time to implement this, but the idea behind this could be adding the emojis to the channel table while creating the profile for that channel, then joining the follower and the channel table where channel.channel_id = "the id of the channel". I will try implementing in this way.**

#### Let me know if you are facing any issue in running the application
