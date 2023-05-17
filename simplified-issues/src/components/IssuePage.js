import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/IssuePage.css';
import '../css/Pagination.css';


const IssuePage = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(
        'https://api.github.com/repos/priyankapatel1508/PriyankaPatel_TD0078/issues',
        {
          headers: {
            Authorization: 'Bearer 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',
          },
        }
      );
      console.log(response.data);
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    const totalPagesCount = Math.ceil(issues.length / 5);
    setTotalPages(totalPagesCount);
  }, [issues]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderIssues = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const displayedIssues = issues.slice(startIndex, endIndex);

    return displayedIssues.map((issue) => (
      <div key={issue.id}>
        <h3 className='titles'>{issue.title}</h3>
        <p className='desc'>{issue.body}</p>
        <hr />
      </div>
    ));
  };

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className='pagination'>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='main'>
      <h1 className='head'>GITHUB ISSUE PAGE</h1>
      <hr />
      <div className='container'>
        {renderIssues()}
      </div>
      {renderPagination()}
    </div>
  );
};

export default IssuePage;
