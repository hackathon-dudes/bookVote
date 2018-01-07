import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate, setCategory, setSubcategory } from '../../actions';
import { Categories } from './Categories';
class SubcategorySelection extends Component {
    constructor(props) {
        super(props)        
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.setState({            
            category:this.props.category,
            subcategory: this.props.subcategory
        })
    }
    handleClick(e) {
        //e.preventDefault();
        this.props.setCategory(e.target.innerText)
        this.setState({category:e.target.innerText});
    }

    render(){
        if(this.state && this.state.category) {
            this.category = (Categories.filter(category => this.state.category === category.name)).pop();
        }
        return(
            <nav>

            {   
                this.category ? this.category.subcategories.map((subcategory) => <NavLink to={this.props.location.pathname+subcategory.path} className="button" activeClassName="button--active" key={subcategory.name}>{subcategory.name}</NavLink>) : null
            }   
            </nav>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        user : state.user, 
        category:state.category,
        subcategory: state.subcategory
    };
  }

export function mapDispatchToProps(dispatch) {
    return bindActionCreators({authenticate, setCategory, setSubcategory}, dispatch);
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SubcategorySelection));