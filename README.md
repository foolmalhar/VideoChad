# VideoChad 🗿 : RAG based Youtube Video Conversational Chat-Bot 📤📺
---
This repository contains an innovative application that leverages the power of Large Language Models (LLMs) to enhance the video learning experience. Specifically, this system is designed to work with NPTEL (National Programme on Technology Enhanced Learning) videos and any English-language YouTube video with a transcript.

## Features

- **Automated Video Summarization**: The application generates concise summaries of video content, allowing users to grasp key concepts efficiently and identify areas requiring deeper focus.
- **Real-time Chat Interaction**: Users can engage in conversation with the video content, fostering a deeper understanding of the subject matter by asking questions and receiving instant responses.
- **Transcript Download**: Users can download a text file containing the transcript of the processed video for future reference.
- **Video Backlinking**: The application incorporates a backlinking feature that enables users to seek relevant timestamps in the video player by clicking on provided reference links.

## Technologies Used

- **Flask**: A lightweight Python web framework used for building the backend API.
- **React**: A JavaScript library for building the user interface on the frontend.
- **Large Language Models (LLMs)**: Specifically, the OpenAI ChatGPT 3.5 (gpt-3.5-turbo) model is employed for generating contextual responses.
- **Retrieval-Augmented Generation (RAG)**: This approach combines a retriever and a language model, allowing for efficient retrieval of relevant information from the video transcript.
- **LangChain**: A framework for building applications with large language models, facilitating the integration of the RAG approach.
- **Vector Database (Chroma)**: A vector database used for storing and efficiently searching the embeddings of the video transcript.
- **OpenAI Embeddings API**: Utilized for converting textual data into high-dimensional vector representations.
- **YouTube API**: Employed for fetching video transcripts and metadata.

## Getting Started 🚀

To get started with this application, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/foolmalhar/VideoChad.git
   ```

2. Install the required dependencies:
   ```
   cd VideoChad
   pip install -r requirements.txt
   ```

3. Set up the necessary environment variables:
   - `OPENAI_API_KEY`: Your [OpenAI API key](https://platform.openai.com/docs/quickstart/account-setup) for accessing the language models.
       > This can be done in ⬆ multiple ways, please read the openai api documentation for detailed steps.

4. Start the Flask backend:
   ```
   python app.py
   ```

5. (Optional) In a separate terminal, start the React frontend:
   ```
   cd react
   npm install
   npm run dev
   ```
   *Only for those who know React/Vite and little bit of front-end*
  **This step is NOT needed to use the application, as i have already build the react application and generated static pages in 'dist' folder and the flask app loads it by default at start! :)**
   
7. Access the application in your web browser at `http://localhost:5000`.

## Usage

1. Enter a valid YouTube video link in the provided input field.
2. The application will fetch the video transcript and generate a summary.
3. Interact with the video content by asking questions in the chat interface.
4. Click on the provided reference links to seek relevant timestamps in the video player.
5. Download the video transcript as a text file for future reference.

## Contributing

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
