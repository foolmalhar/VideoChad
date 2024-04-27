
# VideoChad🗿 : RAG based Youtube Video Conversational Chat-Bot 📤📺

### *Got Bored watching Long Youtube Videos ? Here's a Full Stack App that*
- ⭐ **Generates Smart Summary** ⭐ 
- ↪ **Provides BackLinks (Reference) to the Video (No hallucination)** ↪
- 🗣 **(ChatBot) Enables you to have Conversation with Video** 🗣
- 🧠**Generates MindMap** 🧠

## Demo

[![Thumbnail](https://img.youtube.com/vi/_fflcGaQjBM/0.jpg)](https://www.youtube.com/watch?v=_fflcGaQjBM)


## Features

- **Automated Video Summarization**: The application generates concise summaries of video content, allowing users to grasp key concepts efficiently and identify areas requiring deeper focus.
- **Real-time Chat Interaction**: Users can engage in conversation with the video content, fostering a deeper understanding of the subject matter by asking questions and receiving instant responses.
- **Video Backlinking**: The application incorporates a backlinking feature that enables users to seek relevant timestamps in the video player by clicking on provided reference links.
- **MindMap**: Generates a interactive mindmap using the important keywords from the video content's essence!
- **Transcript Download**: Users can download a text file containing the transcript of the processed video for future reference.


## Technologies Used

- **Flask**: A lightweight Python web framework used for building the backend API.
- **React**: A JavaScript library for building the user interface on the frontend.
- **Large Language Models (LLMs)**: Specifically, the OpenAI ChatGPT 3.5 (gpt-3.5-turbo) model is employed for generating contextual responses.
- **Retrieval-Augmented Generation (RAG)**: This approach combines a retriever and a language model, allowing for efficient retrieval of relevant information from the video transcript.
- **LangChain**: A framework for building applications with large language models, facilitating the integration of the RAG approach.
- **Vector Database (Chroma)**: A vector database used for storing and efficiently searching the embeddings of the video transcript.
- **OpenAI Embeddings API**: Utilized for converting textual data into high-dimensional vector representations.
- **YouTube API**: Employed for fetching video transcripts and metadata.

## Getting Started

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
   - `OPENAI_API_KEY`: Your OpenAI API key for accessing the language models. [OpenAi Platform](https://platform.openai.com/account/api-keys) | [Account Setup](https://platform.openai.com/docs/quickstart/account-setup)

4. Start the Flask backend:
   ```
   python app.py
   ```

5. In a separate terminal, start the React frontend: (optional)
   ```
   cd VideoChad
   npm install
   npm run dev
   ```

6. Access the application in your web browser at `http://localhost:5000`. 
( if you don't use static pre-built files and are running node on the VideoChad frontend, then port might be :3000, check terminal )

## Usage

1. Enter a valid YouTube video link in the provided input field. (Link must have English Transcript available on Youtube )
2. The application will fetch the video transcript and generate a summary.
3. Interact with the video content by asking questions in the chat interface.
4. Click on the provided reference links to seek relevant timestamps in the video player.
5. explore !

## Contributing

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [DeepLearning.ai Short Course](https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/) Understand RAG with Langchain and Chromadb
- [LangChain](https://www.langchain.com/) The Tool!
- [OpenAI](https://openai.com/) for their powerful language models and APIs.
- [Chroma](https://www.trychroma.com/) for their vector database solution.
