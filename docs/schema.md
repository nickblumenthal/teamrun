# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## teams
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| description | text      | not null, foreign key |
| captain     | integer   | not null, foreign key |

## routes
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string    | not null              |
| ua_id       | integer   | unique                |
| description | integer   |                       |
| user_id     | integer   | foreign key           |
| data        | json      | json string           |

## memberships
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| team_id     | integer   | not null              |
| user_id     | integer   | not null              |

## events
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| team_id     | integer   | not null, foreign key |
| route_id    | integer   | foreign key           |
| description | text      | not null              |
| user_id     | integer   | not null, foreign key |
| date        | date      | not null              |
| time        | time      | not null              |
| location    | string    |                       |
| name        | string    | not null              |
