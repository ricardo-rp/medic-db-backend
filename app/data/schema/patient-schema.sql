CREATE TABLE IF NOT EXISTS Patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR,
    birth_date DATETIME,
    mother_name VARCHAR,
    city VARCHAR,
    handbook_number INTEGER UNIQUE,
    bed_number INTEGER UNIQUE,
    sex VARCHAR,
    status_id INTEGER,
    surgery_id INTEGER,
    weight FLOAT,
    FOREIGN KEY(status_id) REFERENCES Status(id),
    FOREIGN KEY(surgery_id) REFERENCES Surgeries(id)
);
