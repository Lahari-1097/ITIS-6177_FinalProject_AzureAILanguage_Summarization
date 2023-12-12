const express = require('express');
const bodyParser = require('body-parser');
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");

const app = express();
const port = process.env.PORT || 3000;

const endpoint = process.env.LANGUAGE_ENDPOINT
const apiKey = process.env.LANGUAGE_KEY

app.use(bodyParser.json());

app.get('/summary', (req, res) => {
  res.send("test");
})

app.post('/summary', async (req, res) => {
  try {
    console.log("Extractive Summarization Process Initiated.");

    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    const documents = req.body.documents;
    const actions = [{ kind: "ExtractiveSummarization", maxSentenceCount: 2 }];

    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();

    const responseArray = [];

    for await (const actionResult of results) {
      if (actionResult.kind !== "ExtractiveSummarization") {
        throw new Error(`Unexpected action result: ${actionResult.kind}`);
      }
      if (actionResult.error) {
        throw new Error(`Error in action result: ${actionResult.error.code} - ${actionResult.error.message}`);
      }
      for (const result of actionResult.results) {
        if (result.error) {
          throw new Error(`Error in result: ${result.error.code} - ${result.error.message}`);
        }
        responseArray.push({
          documentId: result.id,
          summary: result.sentences.map((sentence) => sentence.text).join("\n")
        });
      }
    }

    console.log("Extractive Summarization Process Completed.");
    res.json(responseArray);
  } catch (err) {
    console.error("An error occurred:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
