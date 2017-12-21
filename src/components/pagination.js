import React, { Component } from 'react';
require("../utils/helpers");

const defaultProps = {
    initialPage: 1
}

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        let pager = this.state.pager;
        let totalItems = this.props.total_items;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(totalItems, page, global.localStorage.getItem("pageLimit"));

        // update state
        this.setState({ pager: pager });

        global.showSpinner(this.props.home_component);
        if (!global.localStorage.getItem("searchTerm")) {
            global.callAPI('/shoppinglists/' + global.localStorage.getItem("pageLimit") + '/' + global.localStorage.getItem("currentPage"), "GET")
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        this.props.onChangePage(responseJson.shoppingLists);
                    }
                })
                .catch((error) => {

                });
        } else {
            this.setState({ pager: {} });
        }
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;


        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);


        //set current page globally
        global.localStorage.setItem("currentPage", currentPage);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = this.range(startPage, endPage);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    range(start, end) {
        return [...Array(1 + end - start).keys()].map(v => start + v)
    }

    render() {
        let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination pagination-list">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>««</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>«</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>»</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>»»</a>
                </li>
            </ul>
        );
    }
}

Pagination.defaultProps = defaultProps;
export default Pagination;
