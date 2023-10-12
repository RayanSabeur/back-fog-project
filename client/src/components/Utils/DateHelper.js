import moment from 'moment';
import React from 'react';

export const DateHelper = (releaseDate) => {
    let host = true;
    let currentMonth =  moment().subtract(0, "month").startOf("month").format('MMMM');
    let currentYear =  moment().subtract(0, "year").startOf("year").format('YYYY');
    
    let release = new Date(releaseDate);
    let releaseMonth = release.toLocaleString('en',{month:'long'});
    let releaseYear = release.toLocaleString('en',{year:'numeric'});
    
    if(currentMonth != releaseMonth || currentYear != releaseYear) {
        host = false;
    }
    return host;
};

export const dateParser = (num) => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let timestamp = Date.parse(num);
  
    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  };
  ;
  export const timestampParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let date = new Date(num).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  }
  
  export const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  

export default DateHelper;