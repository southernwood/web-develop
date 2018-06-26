/**
 * Created by sensen on 2017-07-04.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { selectBook } from '../actions/index';

class BookList extends Component {
    renderList() {
        console.log("rendering the booklist");
        return this.props.books.map((book)=>{
            return (
                <li
                    key={book.title}
                    className="list-group-item"
                    onClick={()=>{this.props.selectBook(book)}}>{book.title}</li>
            )
        }
        )
    }
    render(){
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        )
    }

}

function mapStateToProps(state) {
    console.log("mapStateToProps");
    return {
        books: state.books
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectBook: selectBook}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(BookList);