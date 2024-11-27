# Installation Guide
This guide provides the steps to install the B2D Ventures application. Please follow the instructions carefully.

## Backend Installation Steps

1. Clone the repository from GitHub to your computer.
    ```bash
    git clone https://github.com/Kongkawee/B2D-Ventures.git
    ```

2. Go into the backend directory.
    ```bash
    cd backend
    ```
3. Create a virtual environment for the project.
    ```bash
    python -m venv venv
    ```

4. Activate the virtual environment.
    - **MacOS / Linux**
        ```bash
        source venv/bin/activate 
        ```
    - **Windows**
        ```bash
        venv\Scripts\activate
        ```

5. Install the project dependencies.
    ```bash
    pip install -r requirements.txt
    ```
    > **Note**: If `pip` does not work, try `pip3` instead.

6. Set values for externalized variables.
   * Windows
     ```
     copy sample.env .env
     ```
   * macOS / Linux
     ```
     cp sample.env .env 
     ```
7. Migrate.
   ```
   python manage.py migrate
   ```
## Frontend Installation Steps

1. Go into the frontend directory.
    ```bash
    cd frontend
    ```
2. Install the project dependencies.
    ```bash
    npm install --legacy-peer-deps
    ```
3. Set values for externalized variables.
   * Windows
     ```
     copy sample.env .env
     ```
   * macOS / Linux
     ```
     cp sample.env .env 
     ```

