create table channel (
  channel_id serial PRIMARY KEY,
  username varchar(100) unique,
  email varchar(100),
  bio text,
  is_notify boolean,
  is_streaming boolean default false
);

create table follower (
  id serial PRIMARY KEY,
  channel_id int,
  follower_id int REFERENCES channel(channel_id),
  unique (channel_id, follower_id)
);

create table chat (
  id serial PRIMARY KEY,
  channel_id int,
  user_id int REFERENCES channel(channel_id),
  comments text
);
