import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  card: {
    maxWidth: 300,
    maxHeight: 200,
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  unknown: {
    backgroundColor: 'grey',
  },

  approved: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },

  rejected: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  }
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

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.handleOpen} className={classes[this.props.checkpoint.status]}>
          <CardHeader title={this.props.checkpoint.name}/>
          { this.props.checkpoint.image_url &&
            <CardMedia component="img" image={this.props.checkpoint.image_url} />
          }
        </CardActionArea>
        <Dialog fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                scroll="paper"
        >
          <div className={classes.title}>
            <DialogTitle className={classes.title} >
              {this.props.checkpoint.name}
              <Chip label={this.props.checkpoint.status}/>
            </DialogTitle>
            <IconButton onClick={this.handleClose}>
              <CloseIcon/>
            </IconButton>
          </div>
          <DialogContent>
            <Grid container direction="row">
              <Grid item xs={4}>
                { this.props.checkpoint.image_url &&
                  <CardMedia component="img" image={this.props.checkpoint.image_url} />
                }
              </Grid>
              <Grid item xs={4}>
                { this.props.checkpoint.baseline_url &&
                  <CardMedia component="img" image={this.props.checkpoint.baseline_url} />
                }
              </Grid>

              { this.props.checkpoint.diff_url &&
                <Grid item xs={4}>
                  <CardMedia component="img" image={this.props.checkpoint.diff_url} />
                </Grid>
              }
            </Grid>
          </DialogContent>
        </Dialog>
      </Card>
    );
  }
}

export default withStyles(styles)(Checkpoint);
