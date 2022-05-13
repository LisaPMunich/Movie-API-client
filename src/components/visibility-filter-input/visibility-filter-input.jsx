import React from 'react';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../../store/features/filtersSlice';
import {FormControl} from "react-bootstrap";

function VisibilityFilterInput (props){
    return (<>
                <FormControl
                    type="text"
                    onChange={e=>props.setVisibilityFilter(e.target.value)}
                    value={props.visibilityFilter}
                    placeholder="filter by movie title"
                />
            </>)
}

export default connect(
    null,
    {setVisibilityFilter}
)(VisibilityFilterInput);