CREATE TABLE users(
  user_id serial primary key,
  username VARCHAR(50) UNIQUE NOT NULL,
  email varchar(255) unique not null,
  password varchar(255) not null,
  role varchar(255) default 'user' CHECK (role IN ('user', 'admin')) not null,
  created_at date default current_date
);

CREATE TABLE businesses(
    business_id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(user_id),
    business_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    operating_hours VARCHAR(100),
    website VARCHAR(255),
    business_image VARCHAR(255),
    rating NUMERIC DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE reviews(
    review_id SERIAL PRIMARY KEY,
    business_id INT REFERENCES businesses(business_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE responses(
    response_id SERIAL PRIMARY KEY,
    review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE,
    business_id INT REFERENCES businesses(business_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(username, email, password, role) 
VALUES 
('johndoe', 'john.doe@email.com', 'hashedpw123', 'admin'),
('janecool', 'jane.smith@email.com', 'hashedpw456', 'user'),
('techwhiz', 'alex.wong@email.com', 'hashedpw789', 'user'),
('adminpro', 'sarah.admin@email.com', 'hashedpw321', 'admin'),
('userdev', 'dev.user@email.com', 'hashedpw654', 'user');

INSERT INTO businesses(owner_id, business_name,description, category, address, phone_number, operating_hours, website, business_image, rating) 
VALUES 
(1, 'Green Garden Cafe', "'A cozy eco-friendly café offering fresh, organic meals in a beautiful garden setting. Perfect for both casual dining and business meetings.'", 'Restaurant',  '123 Maple Street, Portland, OR 97201', '503-555-0201', 'Mon-Fri 7AM-8PM, Sat-Sun 8AM-6PM', 'www.greengardenpdx.com', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',5),
(4, 'Tech Solutions Hub', 'Professional tech repair and IT consulting services. Specializing in hardware repairs, software solutions, and business IT support.' ,'Technology' ,'456 Pine Avenue, Portland, OR 97202', '503-555-0202', 'Mon-Fri 9AM-6PM', 'www.techsolutionshub.com', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop',5),
(1, 'Fitness First Studio', 'Modern fitness facility equipped with state-of-the-art equipment. Offering personal training, group classes, and specialized workout programs.' ,'Fitness' ,'789 Oak Boulevard, Portland, OR 97203', '503-555-0203', 'Mon-Sun 6AM-10PM', 'www.fitnessfirststudio.com', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',5),
(4, 'Sunset Yoga Center', 'Tranquil yoga studio offering various styles of yoga classes for all skill levels. Features panoramic city views and meditation spaces.','Wellness' ,'321 Cedar Lane, Portland, OR 97204', '503-555-0204', 'Mon-Sun 5AM-9PM', 'www.sunsetyoga.com', 'https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=2070&auto=format&fit=crop',5);


INSERT INTO reviews(business_id, user_id, rating, review_text) 
VALUES 
(1, 2, 5, 'Amazing cafe! The garden atmosphere is so peaceful and the food is fantastic.'),
(1, 3, 4, 'Great vegetarian options and friendly staff. Lovely outdoor seating.'),
(2, 5, 5, 'Tech Solutions Hub helped me fix my laptop in no time. Very professional service!'),
(3, 2, 5, 'Best fitness studio in Portland! Great equipment and knowledgeable trainers.'),
(4, 3, 4, 'Wonderful yoga classes. The sunset views during evening sessions are breathtaking.');

INSERT INTO responses(review_id, business_id, user_id, response_text) 
VALUES 
(1, 1, 1, 'Thank you for your kind words! We strive to maintain our garden as a peaceful oasis.'),
(2, 1, 1, 'We appreciate your feedback on our vegetarian menu. Hope to see you again soon!'),
(3, 2, 4, 'Thank you for trusting us with your tech needs. Your satisfaction is our priority.'),
(4, 3, 1, 'We are thrilled you enjoyed our facilities. Keep up the great work!'),
(5, 4, 4, 'The sunset views are indeed special. Thank you for being part of our yoga community!');
