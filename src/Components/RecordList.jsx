import { useContext, useState } from "react";
import RecordsContext from "../Contexts/RecordsContext";
import RecordCard from "./RecordCard";

function RecordList() {
  //access data from RecordsContext
  const { recordsState } = useContext(RecordsContext);
  const [searchTerm, setSearchTerm] = useState("");

  const displayedRecords = recordsState
    .filter((record) => 
      searchTerm === ""
        ? record
        : record.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((record) => {
      return <RecordCard key={record._id} record={record} />;
    });
  return (
    <>
      <h1>Record List</h1>
      <form>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </form>
      <div className="cardContainer">
        {displayedRecords.length > 0 ? displayedRecords : <h2>Loading...</h2>}
      </div>
    </>
  );
}

export default RecordList;
