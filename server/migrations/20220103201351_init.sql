CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE  users (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name text
);

insert into users(id, name) values(DEFAULT, 'steve');


CREATE TABLE  recipes (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title text NOT NULL,
  description text NOT NULL,
  teaser_image text NOT NULL,
  instructions text NOT NULL
);

insert into recipes (id, title, description, teaser_image, instructions)
values('116f4805-03d9-4f04-ad51-fe622cacc0af', 'cheese', 'my description', 'xx', 'make the stuff');