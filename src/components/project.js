import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import GridList from "@material-ui/core/GridList";
import CardHeader from "@material-ui/core/CardHeader";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Project(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Card className={classes.root} style={{ margin: "15px 5px" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={props.project.name}
        />
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            className={classes.media}
            image={props.project.images[0]}
            title={props.project.name}
            style={{ minHeight: "300px" }}
          />
        </CardActionArea>

        <CardContent>
          <Typography
            variant="body2"
            component="p"
            style={{
              height: "80px",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {props.project.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            size="medium"
            href={props.project.link}
            target="_blank"
          >
            Source Code
          </Button>
          <Button
            color="primary"
            size="medium"
            href={props.project.isLive ? props.project.live : "#"}
            target={props.project.isLive ? "_blank" : ""}
          >
            Go Live
          </Button>
          <IconButton aria-label="delete" style={{ marginLeft: "auto" }}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{
          height: "fit-content",
          width: "fit-content",
        }}
      >
        <IconButton
          onClick={handleClose}
          style={{
            width: "52px",
            marginLeft: "auto",
          }}
        >
          <CloseIcon />
        </IconButton>
        <GridList cellHeight={200} spacing={1} className={classes.gridList}>
          {props.project.images.map((tile) => (
            <GridListTile
              style={{
                height: "fit-content",
                width: "100%",
              }}
            >
              <img
                src={tile}
                alt="err"
                style={{
                  maxWidth: "100%",
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </Dialog>
    </div>
  );
}
