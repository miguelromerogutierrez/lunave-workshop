import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function withHOCPagination(Component) {
    return class HOCPagination extends Component {

        state = {
            itemsPerPage: 15,
            data: [],
            itemsPage: [],
            pages: 0,
            currentPage: 0
        }

        initPaginator = (data, itemsPerPage = 15) => {
            const pages = Math.ceil(data.length / itemsPerPage);
            const itemsPage = data.slice(0, itemsPerPage);
            this.setState({ pages, currentPage: 0, itemsPage, data, itemsPerPage });
          }

        setData = (data, itemsPerPage) => {
            this.initPaginator(data, itemsPerPage)
        }

        goPage = index => {
            const posInit = index * this.state.itemsPerPage
            const posEnd = Math.min(posInit + this.state.itemsPerPage, this.state.data.length);
            const itemsPage = this.state.data.slice(posInit, posEnd);
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
                ...state
            }
        }
    
        render() {
            return <Component
                {...this.props}
                {...this.getProps()}
                setData={this.setData}
                prevPage={this.prevPage}
                nextPage={this.nextPage}
                goPage={this.goPage}
            />
        }
    }
}
