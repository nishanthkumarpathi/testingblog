---
title: PostgreSQL
tags: ['PostgreSQL', 'PostgreSQL Commands', 'PostgreSQL Cheat Sheet', 'PostgreSQL Quick Reference']
---

This tutorial will guide you through setting up a PostgreSQL database on your local machine.

## Step 1: Initialize the Database

The first step is to initialize the database using the `initdb.exe` command. This will create a new database cluster and you'll be asked to set a password for the `postgres` user. The encoding is set to `UTF8` and the authentication method to `scram-sha-256`.

```shell
initdb.exe -D C:toolspgsqlpgsql_data -U postgres -W -E UTF8 -A scram-sha-256
```

## Step 2: Start the Database

Once the database has been initialized, you can start it using the `pg_ctl.exe` command. The `-l` option specifies the name of the file to which the server's output will be written.

```shell
pg_ctl.exe -D C:toolspgsqlpgsql_data -l logfile start
```

## Step 3: Stop the Database

To stop the running database, you can use the `pg_ctl.exe` command again with the `stop` argument.

```shell
pg_ctl.exe -D C:toolspgsqlpgsql_data stop
```

Congratulations! You've successfully initialized, started, and stopped a PostgreSQL database on your local machine.
