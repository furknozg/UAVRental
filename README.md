# UAVRental


UAV Rental Project with Django

they want
- Python
- Django
- Postgresql
- Rest Framework

functionality
- Membership and Login Screen
- For the UAV to be rented; Add, Delete, Update, List, Rent
+ UAV Features: Brand, Model, Weight, Category etc.
- Members' UAV rental records
- For the leased UAV; Deleting, Updating, Listing a Rental
+ Rental Features: UAV, Date and Time Ranges, Renting Member etc.
- Filtering and searching features in the table for all Listing pages


Extras (Bonus)
- Restarting the project with docker
- Well-crafted documentation and comment lines
- Unit testing
- Using datatable for listing pages
- Using server-side datatable
- Using asynchronous (Ajax, fetch etc.) structure on the front side
- Keeping relational tables separately
- Using extra libraries for Django
- Front-End Bootstrap, Tailwind, Jquery etc. use

NOTE
- There is no need to do a very detailed study on the front. A simple interface is sufficient.
- You can use ready-made templates.

USAGE:
  Back End:
    Option 1: docker-compose up 
    Option 2 (local configuration):
      
      run postgres initdb
      
      specify a .env file in the root of the back-end that authenticates to configuration of your db:
          
          {DB_NAME=dbname
          DB_USER=usr
          DB_PASSWORD=pass
          DB_HOST=localhost
          DB_PORT=5432}
          
      run python manage.py runserver
  Front End:
    npm install .
    npm run start 
After completing your project and uploading it to GitHub, you need to save the project link as an answer in the field below. You can also upload project screenshots to your GitHub repo.

Project duration is 3 days.
