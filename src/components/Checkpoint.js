import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    maxWidth: 300,
  },
});

class Checkpoint extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const img_src = process.env.REACT_APP_APPOCULAR_URL + '/image/' + this.props.checkpoint.image_sha
    const baseline_src = this.props.checkpoint.baseline_sha ?
          process.env.REACT_APP_APPOCULAR_URL + '/image/' + this.props.checkpoint.baseline_sha :
          null;

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.handleOpen}>
          <CardHeader title={this.props.checkpoint.name} />
          <CardMedia component="img" image={img_src} />
        </CardActionArea>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Card>
            <CardHeader
              action={
                <IconButton onClick={this.handleClose}>
                  <CloseIcon/>
                </IconButton>
              }
              title={this.props.checkpoint.name} />
            <Grid container>
              <Grid item xs={6}><CardMedia component="img" image={img_src} /></Grid>
              <Grid item xs={6}>
                { baseline_src &&
                  <CardMedia component="img" image={baseline_src} />
                }
              </Grid>
            </Grid>
          </Card>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(Checkpoint);
