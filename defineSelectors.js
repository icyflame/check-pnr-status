var csspath_from = 'body > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.text_back_color > table > tbody > tr:nth-child(2) > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(7)';
var csspath_to = 'body > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.text_back_color > table > tbody > tr:nth-child(2) > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(6)';
var csspath_date = 'body > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.text_back_color > table > tbody > tr:nth-child(2) > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(3)';
var csspath_status = 'body > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.text_back_color > table > tbody > tr:nth-child(2) > td:nth-child(1) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3)';

var selectors = [csspath_from, csspath_to, csspath_date, csspath_status];

var tableHeaders = ['from', 'to', 'date', 'status'];

module.exports.selectors = selectors;
module.exports.tableHeaders = tableHeaders;
