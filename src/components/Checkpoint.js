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
import CheckIcon from '@material-ui/icons/Check';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Appocular from '../Appocular';

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
    checkpoint: this.props.checkpoint
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleApprove = async () =>  {
    const checkpoint = await Appocular.checkpointAction(this.state.checkpoint, 'approve')
    this.setState({checkpoint: checkpoint})
  };

  handleReject = async () =>  {
    const checkpoint = await Appocular.checkpointAction(this.state.checkpoint, 'reject')
    this.setState({checkpoint: checkpoint})
  };

  handleIgnore = async () =>  {
    const checkpoint = await Appocular.checkpointAction(this.state.checkpoint, 'ignore')
    this.setState({checkpoint: checkpoint})
  };

  render() {
    const { classes } = this.props
    const { open, checkpoint } = this.state

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.handleOpen} className={classes[checkpoint.status]}>
          <CardHeader title={checkpoint.name}/>
          { checkpoint.image_url &&
            <CardMedia component="img" image={checkpoint.image_url} />
          }
        </CardActionArea>
        <Dialog fullScreen
                open={open}
                onClose={this.handleClose}
                scroll="paper"
        >
          <div className={classes.title}>
            <DialogTitle className={classes.title} >
              {checkpoint.name}
              {checkpoint.actions && checkpoint.actions.approve ?
               <IconButton onClick={this.handleApprove}>
                 <CheckIcon/>
               </IconButton> : ''
              }
              {checkpoint.actions &&  checkpoint.actions.reject ?
               <IconButton onClick={this.handleReject}>
                 <CloseIcon/>
               </IconButton>
               : ''
              }
              {checkpoint.actions && checkpoint.actions.ignore ?
               <IconButton onClick={this.handleIgnore}>
                 <MoreHorizIcon/>
               </IconButton>
               : ''
              }
              <Chip label={checkpoint.status}/>
            </DialogTitle>
            <IconButton onClick={this.handleClose}>
              <CloseIcon/>
            </IconButton>
          </div>
          <DialogContent>
            <Grid container direction="row">
              <Grid item xs={4}>
                { checkpoint.image_url &&
                  <CardMedia component="img" image={checkpoint.image_url} />
                }
              </Grid>
              <Grid item xs={4}>
                { checkpoint.baseline_url &&
                  <CardMedia component="img" image={checkpoint.baseline_url} />
                }
              </Grid>

              { checkpoint.diff_url &&
                <Grid item xs={4}>
                  <CardMedia component="img" image={checkpoint.diff_url} />
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
