import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class Accepted extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      documents: []
    }
  }


  showModal = (docs) => {
    this.setState({ show: true });
    this.setState({ documents: docs });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.setState({ documents: [] });

  };


  render() {

    const schoolsItems = this.props.accepted_comp_state;

    if (schoolsItems) {

      return (

        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SchoolName</TableCell>
                  <TableCell>SchoolStatus</TableCell>
                  <TableCell>SchoolDocument</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {schoolsItems.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell style={{color:"green"}}>{row.status}</TableCell>
                    <TableCell> <DescriptionIcon onClick={() => this.showModal(row.documents)} /> </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>


          <Modal show={this.state.show} handleClose={this.hideModal} >

            <div className='modalItems'>
              {this.state.documents.map(document =>
                (<a href={document.url} target='_blank' rel="noopener noreferrer"> {document.name} </a>))
              }
            </div>

          </Modal>

        </div>
      )
    } else {
      return <div className='no-data'> No Accepted Data ... </div>
    }

  }


}

const Modal = ({ handleClose, show, children }) => {

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>

        {children}

        <Button onClick={handleClose} variant="contained" size="small" className='close'>
          Close
        </Button>

      </section>
    </div>
  );
};

/* get latest state from reducer and use it here as props */
function mapStateToProps(state) {
  return {
    accepted_comp_state: state.accepted
  }
}



export default connect(mapStateToProps)(Accepted);