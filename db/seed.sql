-- DROP DATABASE IF EXISTS your_table;
-- CREATE DATABASE your_table;

-- \c your_table

CREATE TABLE admin(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    fname VARCHAR NOT NULL,
    lname VARCHAR,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password_digest VARCHAR NOT NULL
);

CREATE TABLE customers(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    fname VARCHAR NOT NULL,
    lname VARCHAR,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password_digest VARCHAR NOT NULL
);


CREATE TABLE restaurents(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    cuisines VARCHAR,
    hours_of_operation VARCHAR,
    phone_number VARCHAR(10),
    img VARCHAR
);

CREATE TABLE reservations(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL default '00:00',
    customer_id INT NOT NULL,
    restaurent_id INT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customers,
    FOREIGN KEY(restaurent_id) REFERENCES restaurents
);

INSERT INTO restaurents(name, cuisines, hours_of_operation, phone_number, img) VALUES 
('tokyo', 'japanese', '1:00 pm - 11:30 pm, 7 days a week', '0537485943', 'https://pbs.twimg.com/profile_images/435033051542740992/T4NNuHx__400x400.jpeg'),
('the Grill', 'barbecue, steak', 'Sunday - Friday: 12pm - 4pm, 7pm - 12am', '0555938475', 'http://thegrillrestaurant.com/wp-content/uploads/2015/05/TheGrillRestaurant-Stratford-EastHam-FooterLogo.png'),
('piatto', 'italian', '10:00 am - 11:30 pm, 7 days a week', '0588909989', 'https://pbs.twimg.com/profile_images/696666984155639809/LF9DMlor_400x400.jpg'),
('the Globe', 'European', '12:00 pm - 12:00 am, 7 days a week', '0588475988', 'http://www.simals.com/images/gallery/01_interiordesign/03_retail/08_atf01/atf01_04_large.jpg'),
('diamond', 'chinese', 'Sunday - Friday: 12pm - 4pm, 7pm - 12am', '0522345567', 'http://mysaudiguides.com/yummy/images/rest/117_1898742329.jpg'),
('nozomi', 'japanese', 'Sunday: 12pm - 11:30pm - Friday:  2pm - 12am', '0566656665', 'https://media-cdn.tripadvisor.com/media/photo-s/0a/31/6a/8d/front.jpg'),
('sultan steakhouse', 'steakhouse, barbecue, turkish', '1:00 pm - 11:30 pm, 7 days a week', '0539949556', 'http://www.sultanssteakhouse.com/Files/161127meltinter186-HDR(1).jpg'),
('zafran indian bistro', 'indian', '1:00 pm - 11:30 pm, 7 days a week', '0599496940', 'https://pbs.twimg.com/media/CzKavVFXgAAEH8l.png');