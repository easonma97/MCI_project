import psycopg2

# Connect to your postgres DB
conn = psycopg2.connect("dbname=postgres user=postgres password=12345")

# Open a cursor to perform database operations
cur = conn.cursor()

# # Execute a query
cur.execute("SELECT DISTINCT class FROM bank")

# Retrieve query results
# class_records = cur.fetchone()
# class_records = ' '.join(map(str, class_records))
# print(class_records)

for record in cur:
    class_records = ' '.join(map(str, record))
    print(class_records)