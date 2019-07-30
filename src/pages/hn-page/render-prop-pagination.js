import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shallowequal from 'shallowequal';

export default class Pagination extends Component {

    state = {
        itemsPage: [],
        pages: 0,
        currentPage: 0
    }

    componentDidMount() {
      this.initPaginator(this.props.data, this.props.itemsPerPage)
    }

    componentDidUpdate(prevProps, prevState) {
      if (!shallowequal(prevProps.data, this.props.data))
        this.initPaginator(this.props.data, this.props.itemsPerPage)
    }

    initPaginator = (data, itemsPerPage = 15) => {
        const pages = Math.ceil(data.length / itemsPerPage);
        const itemsPage = data.slice(0, itemsPerPage);
        this.setState({ pages, currentPage: 0, itemsPage, data, itemsPerPage });
      }

    goPage = index => {
        const posInit = index * this.props.itemsPerPage
        const posEnd = Math.min(posInit + this.props.itemsPerPage, this.props.data.length);
        const itemsPage = this.props.data.slice(posInit, posEnd);
        this.setState({ currentPage: index, itemsPage });
    }
      
    nextPage = () => {
        this.goPage(Math.min(this.state.currentPage + 1, this.state.pages));
    }
      
    prevPage = () => {
        this.goPage(Math.max(this.state.currentPage - 1, 0));
    }

    getProps = () => {
        const { data, itemsPerPage, ...state } = this.state;
        return {
            ...state,
        }
    }

    render() {
        return this.props.children(
            {
                ...this.getProps(),
                prevPage: this.prevPage,
                nextPage: this.nextPage,
                goPage: this.goPage,
            }
        )
    }
}
