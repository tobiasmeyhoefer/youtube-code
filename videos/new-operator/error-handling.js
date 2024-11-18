// ❌❌❌ The HELL

function fetchData() {
  throw new Error("Fetch error!");
}

function processData(data) {
  if (!data) throw new Error("Processing error!");
  return data + " processed";
}

function saveData(data) {
  if (!data) throw new Error("Save error!");
  console.log("Data saved successfully:", data);
}

try {
  try {
      let data;
      try {
          data = fetchData();
      } catch (fetchError) {
          console.error("Error fetching data:", fetchError.message);
          throw new Error("Unable to proceed without fetched data.");
      }

      let processedData;
      try {
          processedData = processData(data);
      } catch (processError) {
          console.error("Error processing data:", processError.message);
          throw new Error("Cannot proceed without processed data.");
      }

      try {
          saveData(processedData);
      } catch (saveError) {
          console.error("Error saving data:", saveError.message);
          throw new Error("Data save operation failed.");
      }
  } catch (operationError) {
      console.error("Operation failed:", operationError.message);
  }
} catch (finalError) {
  console.error("Critical error:", finalError.message);
}

console.log("Execution completed.");

//Why Error Handling
const doSomething = () => {
  throw new Error("This was fobidden")
}
try {
  const test = doSomething()
} catch (error) {
  console.error(error)
}

// this is how we used to do it 
try {
  const result = potentiallyFailingFunction();
} catch (error) {
  console.error('An error occurred:', error);
}


// ❌ nested code
async function fetchData() {
  try {
    const response = await fetch('https://example.com/data');
    try {
      const data = await response.json();
      return data;
    } catch (parseError) {
      console.error(parseError);
    }
  } catch (networkError) {
    console.error(networkError);
  }
}
















// ✅ new feature
async function fetchData() {
  const [err, res] ?= await fetch('https://example.com/data');
  if (err) return console.error(err);
}

// ❌ nested code
async function fetchData() {
  try {
    const response = await fetch('https://example.com/data');
    try {
      const data = await response.json();
      return data;
    } catch (parseError) {
      console.error(parseError);
    }
  } catch (networkError) {
    console.error(networkError);
  }
}

// more complex example 
async function fetchData() {
  const [networkError, response] ?= await fetch('https://example.com/data');
  if (networkError) return console.error(networkError);

  const [parseError, data] ?= await response.json();
  if (parseError) return console.error(parseError);
  return data;
}

//variants
//get lost if theres an error 
const [, result] ?= await fetch("https://example.com/data");

//instant return
async function fetchData() {
  const [err, res] ?= await fetch('https://example.com/data');
  if (err) return;
}

//bad case
function writeTransactionsToFile(transactions) {
  let writeStatus;
  try {
    fs.writeFileSync('test.txt', transactions);
    writeStatus = 'success';
  } catch (error) {
    writeStatus = 'error';
  }
  // writestatus...
}

//keep it immutable
function writeTransactionsToFile(transactions) {
  const [err, data] ?= fs.writeFileSync('test.txt', transactions)
  const writeStatus = err ? 'error' : 'success'
  // do something with writeStatus ...
}

