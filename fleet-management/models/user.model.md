# Users Table

## Columns
- id (uuid, PK)
- name (text)
- email (unique)
- password (text)
- role (customer|owner|driver)
- created_at (timestamp)

## Relationships
- One user → many vehicles
- One user → many trips
