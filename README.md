## Stonks Assignment

### Technologies used

- Frontend: NextJS
- CSS Framework: Tailwind CSS
- Backend: Supabase
- Deployed the application on vercel:- https://stonks-deploy.vercel.app/
- For sending emails I have used resend, although it's not working properly because of their new updation

## My approach to start building the application

- Whenever I work on a component, first I design the UI of that component, then I do the backend part.
- For building this application, first I saw some YouTube Videos of "Supabase" ORM on how to write the SQL queries and then I started building the application.
- Although I faced some issues while sending emails to the followers of a channel when the channel starts streaming because of a new policy in "resend" that you can only test emails with the registered users. That's why the email sending part will not work. I will try implementing this part using Nodemailer.
- I also faced some issue while doing an inner join among channel and follower table in order to get the email ids of a channel's followers, so to overcome this I created a SQL function and wrote the join sql query inside it.

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

3. **Install all the dependencies**

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

9. **Creating a .env.local file to store the environment variables**

- I have provided an example file named `dotenv.local.example`, where the format of providing the environment variables are given. Provide the enironment variables inside the .env.local file like the example file, then run the application

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
  - Nico can go on Eddy’s stream and start chatting (basic) --> **Done. I have implemented an unidirectional way of sending messages i.e after every response, the connection is automatically closed. I haven't got time to implement bi-directional way of sending messages i.e using websockets. But it's working fine. You can chat by going to any channel but you have to log in to start chatting.**

**Bonus**

- i18n integration:- **I am not sure exactly how can I implement this.**
- Emojis linked to a channel:- **I haven't got time to implement this, but the idea behind this could be adding the emojis to the channel table while creating the profile for that channel, then joining the follower and the channel table where channel.channel_id = "the id of the channel". I will try implementing in this way.**

#### Let me know if you are facing any issue in running the application
