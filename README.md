# ITIS-6177_FinalProject_AzureAILanguage_Summarization

# Summarization

This readme file contains documentation for my API I've created for Summaraization using AzureAILanguage. It is actively used for Text Analytics.

The AzureAILanguage resource is a wrapper to Azure's Cognitive Services API, specifically the [Text Analytics service](https://azure.microsoft.com/en-us/products/ai-services/ai-language/) providing various language services.

[Summarization](https://learn.microsoft.com/en-us/azure/ai-services/language-service/summarization/overview?tabs=document-summarization) by using these services for Language, you will be exposed to powerful features for extracting essential information from unstructured text. Document summarization, available in extractive and abstractive approaches, generates concise summaries by extracting key sentences or crafting new ones to capture the main idea. Conversation summarization accepts various speech artifacts and extracts pertinent content for understanding. Utilize this service via REST API or libraries in languages like Python and C#. 

![image](https://learn.microsoft.com/en-us/azure/ai-services/language-service/custom-text-analytics-for-health/media/development-lifecycle.png)
![image](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/_images/conversation-summarization-overview.png)


* ref: https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/custom-text-classification/overview
* ref: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/conversation-summarization


# Service Capabilities

Azure provides services like document summarization and conversation summarization. I have utilized document summarization.

Document Summarization: With this approach, long documents or articles are condensed into shorter versions but the essential content is retained. There are often two methods:

1. Extractive Summarization: This method creates a summary by picking the most important sentences or sections from the source text, thereby "extracting" pertinent information without changing it.
2. Abstractive Summarization: This technique creates fresh, streamlined content that may not be found in the source text exactly. It reinterprets and rewords the data to produce a logical synopsis.


# Development

Text Analytics is a unique offering that uses AI to handle language-related activities in a comprehensive manner. It gives people the ability to comprehend, evaluate, and draw conclusions from textual data. This service includes cognitive abilities for language analysis, making it possible to extract useful data from many kinds of text. It provides deep insights and makes semantic search easier with its sophisticated machine learning models. Through contextual ranking of search results, AzureAILanguage facilitates user intent understanding and improves search relevancy for effective information exploration.

This version emphasizes the capabilities of AzureAILanguage - Text Analytics specifically for language-related tasks and extracting insights from textual data.

**Environment And Libraries Used**

Entity Recognition:

- Protocol used: HTTP
- Development language: Node.js - Express.js
- Libraries: @azure/ai-text-analytics
- API Checker : postman

## Data Validation
To validate the API, I used the help of [Postman](https://learning.postman.com/docs/introduction/overview/).

I had verified a situation where I give an empty string
![Image](https://i.ibb.co/B25q9kb/SI1.png)

I also verified wheres I removed the ID, and an error was thrown saying one input is missing from the attribute Id
![image](https://i.ibb.co/42br0p0/SI2.png)

I have written the code to handle extractive summarization results.
![image](https://i.ibb.co/MBXwCR2/SI3.png)


# Try Out

In order to conduct testing and examine the functionality, the API is now hosted in one of Digital Ocean's droplets.

### Server Endpoint

```
http://157.245.10.149:3000/
```

### API Endpoint

```
http://157.245.10.149:3000/summary
```

### Sample Post Request Body
```application/json```
```Array of strings ```
```json
{
  "documents": [
    {
      "language": "en",
      "id": "2",
      "text": "In the realm of technology, innovation shapes our daily lives. From the seamless integration of artificial intelligence to the rapid evolution of mobile devices, the digital landscape is dynamic. As data becomes the currency of the future, cybersecurity emerges as a paramount concern"
    }
  ]
}
```

## Possible Responses :

| Response code | Description                                                         |
| ------------- | ------------------------------------------------------------------  |
| 200           | Text was summarized successfully                                    | |
| 500           | Internal Sevrer Error         |


### Output:

Recognizes and identifies the text and gives the summarized version of the text.



# Setup in Local

1. Create [Azure language resource](https://azure.microsoft.com/en-us/products/ai-services/ai-language/#overview) and copy the Key and Endpoint
2. Set the Key and Endpoint as environment variables with the variable names LANGUAGE_KEY and LANGUAGE_ENDPOINT respectively.
3. Ensure that you have Node.js installed. If not, download and install the latest version of Node.js.
4. Clone the repository to your local machine.
5. Open a terminal and navigate to the project's directory, then run the command npm install to install the required dependencies.
6. To start the server locally, use the command nodemon app.js in the terminal.
7. Test the server by accessing the following endpoint in your browser: http://localhost:3000/
8.To test the API, send a POST request to the following endpoint: http://157.245.10.149:3000/summary, with the corresponsing post body and analyze for summarization.

# Usage:

## Document Summarization

* The purpose of document summarization is to condense content that readers deem too lengthy to read. Articles, papers, or documents are summarized into essential sentences using both extractive and abstractive summarizing techniques.
 
**Request:**

```
curl -X 'POST' \
  'http://157.245.10.149:3000/summary' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '[
  "Generative AI refers to a subset of artificial intelligence that focuses on creating new content, be it images, text, or even music, mimicking human-like creativity. This technology leverages neural networks to generate original and diverse outputs based on patterns and examples from large datasets. Generative AI has showcased remarkable advancements in various fields, enabling applications in art, content creation, and even aiding in problem-solving by producing innovative solutions based on learned patterns."
]'
```

**Response:**

```[
    {
        "documentId": "2",
        "summary": "Generative AI refers to a subset of artificial intelligence that focuses on creating new content, be it images, text, or even music, mimicking human-like creativity.\nThis technology leverages neural networks to 
generate original and diverse outputs based on patterns and examples from large datasets."
    }
]
```



## Testing using PostMan

* I verified the API's with the help of postman.
![Image](https://i.ibb.co/TPDYWjD/SI4.png) 
