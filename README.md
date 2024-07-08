## Twitch Clone

#### Overview

This is a Twitch clone that allows users to log in with their Google account, create channels, start streaming, and interact with other users. The platform supports channel following and live chat functionality.

### Features

- **User Authentication:** Users can log in using their Google account.
- **Channel Creation:** Authenticated users can create their own streaming channels.
- **Live Streaming:** Users can start live streams on their channels.
- **Follow Channels:** Users can follow their favorite channels.
- **Live Chat:** Users can participate in live chats on channels.

### Technologies used

- Frontend: NextJS, ReactJS
- CSS Framework: Tailwind CSS
- Backend: Supabase
- Deployed this application on vercel:- https://twitchdeploy-arpit-mallicks-projects.vercel.app/

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

### Twitch-Clone Deploy Github

- Link:- https://github.com/arpit5492/twitch_deploy
