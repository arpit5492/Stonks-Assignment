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
  username varchar(100),
  comments text
);

-- SQL Function to do inner join between channel and follower table to get the email ids of the followers of a channel

create function get_channel_emails(channel_id integer)
returns table(email text)
as $$
  select c.email
  from channel as c
  join follower as f on f.follower_id = c.channel_id
  where f.channel_id = $1;
  $$ language sql;


