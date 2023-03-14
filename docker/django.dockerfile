FROM python:3.8-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ../requirements/requirements.txt .

RUN apt-get update && apt-get install -y libpq-dev

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 80

# Make port 80 available to the world outside this container