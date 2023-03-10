const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  function createHashSHA512(data) {
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = createHashSHA512(data);
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHashSHA512(candidate)
  }
  return candidate;
};
