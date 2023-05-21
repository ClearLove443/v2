---
title: "null vs empty string in oracle"
date: 2022-03-14 21:28:58
tag: [oracle, empty string]
category: database
published: true
hideInList: false
feature:
isTop: false
---

Learn about NULL value and an empty string behavior in oracle database with example queries.

- NULL means no-value(nothing).
- An empty string(”) treated as NULL value

Let’s create a table suppliers_tbl with the following table definition.

```sql
create table suppliers_tbl
( supplier_id number,
  supplier_name varchar2(100)
);
```

Next, we’ll insert following records into this table.

```sql
insert into suppliers_tbl (supplier_id, supplier_name )
values ( 1, null );  -- insertion statement 1

insert into suppliers_tbl (supplier_id, supplier_name )
values ( 2, '' ); -- insertion statement 2


insert into suppliers_tbl (supplier_id, supplier_name )
values ( NULL, null );  -- insertion statement 3

insert into suppliers_tbl (supplier_id, supplier_name )
values ( '', null );  -- insertion statement 4
```

The first statement inserts a record with a supplier_name that is null, while the second statement inserts a record with an empty string as a supplier_name.

The third statement inserts a record with a supplier_id that is null, while the fourth statement inserts a record with an empty string as a supplier_id.

with the above four statements we can observe that NULL has no bounds. It can be used for string, integer, date, etc. fields in a database.

It is better to use NULL , not an empty string if you have no value for a field.

The basic difference between empty string and NULL value is , empty string is allocated to a memory and NULL value is not allocated any memory.

```sql
SELECT * FROM suppliers_tbl
WHERE supplier_id='';

select * from suppliers_tbl
where supplier_name = '';

```

When you run above statements, you’d expect to retrieve the row that you inserted above. But instead, this statement will not retrieve any records at all.

Now, try retrieving all records where the supplier_name contains a null value:

```sql
SELECT * FROM suppliers_tbl
WHERE supplier_name IS NULL;


SELECT * FROM suppliers_tbl
WHERE supplier_id IS NULL;
```

When you run above statements, you will retrieve all the rows that contain NULL and empty string values.

Notes:

- NULL value is unique. We cannot use the usual operators like <,<=,>,>=,==,!= etc operators.
- We can use only IS NULL and IS NOT NULL condition to compare the NULL values.

## Point to Remember:

- Oracle internally changes empty string to NULL values. Oracle simply won't let insert an empty string.On the other hand, SQL Server would let you do what you are trying to achieve.

- Null has no bounds, it can be used for string, integer, date, etc. fields in a database. Empty string is just regarding a string; it’s a string like ‘asdfasdf’ is, but is just has no length. If you have no value for a field, use null, not an empty string.
- A NULL value represents the absence of a value for a record in a field (others software’s call it also a missing value).
- An empty value is a “field-formatted” value with no significant data in it.
- NULL isn’t allocated any memory, the string with NULL value is just a pointer which is pointing to nowhere in memory. however, Empty IS allocated to a memory location, although the value stored in the memory is “”.
- Null is the database’s determination of an absense of a value logically, so to speak. You can query like: where FIELD_NAME is NULL
