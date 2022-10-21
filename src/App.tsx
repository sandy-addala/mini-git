import { Button, TextField } from "@mui/material";
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import Repos from "./Components/Repos";
import Commits from "./Components/Commits";

function App() {
  let [commits, setCommits] = useState<any>(undefined);
  let [repo, setRepo] = useState<any>(undefined);
  let [accessKey, setAccessKey] = useState<any>(undefined);
  let [userName, setUserName] = useState("");

  useEffect(() => {
    setAccessKey(localStorage.getItem("accessKey"));
  }, []);

  const octokit = new Octokit({
    auth: accessKey,
  });

  function getCommits(repo: string, username: string) {
    setRepo(repo);
    setUserName(username);
    octokit
      .request("GET /repos/{username}/{repo}/commits", {
        username,
        repo,
      })
      .then((response) => {
        let { data } = response;
        let commits = data.map((entry: any) => {
          return {
            ...entry.commit.committer,
            message: entry.commit.message,
            sha: entry.sha.substring(0, 7),
            author: entry.commit.author.name,
          };
        });
        setCommits(commits);
      })
      .catch((error) => {});
  }

  function addAccessKey() {
    setAccessKey(localStorage.getItem("accessKey"));
  }

  if (!accessKey) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="access-key"
          variant="outlined"
          size="small"
          onChange={(e) => {
            localStorage.setItem("accessKey", e.target.value);
          }}
        />
        <Button variant="contained" onClick={addAccessKey}>
          Enter
        </Button>
      </div>
    );
  }

  return (
    <div className="App">
      <div style={{ display: "flex", padding: "10px" }}>
        <b>MINI</b>git
      </div>

      {!commits && <Repos accessKey={accessKey} getCommits={getCommits} />}

      {commits && (
        <Commits
          commits={commits}
          setCommits={setCommits}
          getCommits={getCommits}
          repo={repo}
          user={userName}
        />
      )}
    </div>
  );
}

export default App;
