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
import GridListTile from "@material-ui/core/GridListTile";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		background: "#424242",
		color: "#eeeeee",
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
				<CardActionArea onClick={handleClickOpen}>
					<CardMedia
						className={classes.media}
						image={props.project.images[0]}
						title={props.project.name}
						style={{ minHeight: "300px" }}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.project.name}
						</Typography>
						<Typography
							variant="body2"
							component="p"
							style={{
								height: "80px",
								textOverflow: "ellipsis",
								overflow: "hidden",
								color: "#bdbdbd",
							}}
						>
							{props.project.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						size="medium"
						href={props.project.link}
						style={{ color: "#64b5f6" }}
						target="_blank"
					>
						Source Code
					</Button>
					<Button
						style={{ color: "#64b5f6" }}
						size="medium"
						href={props.project.isLive ? props.project.live : "#"}
						target={props.project.isLive ? "_blank" : ""}
					>
						Go Live
					</Button>
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
					aria-label="search"
					color="inherit"
					onClick={handleClose}
					style={{
						width: "47px",
						position: "absolute",
						right: "20px",
						zIndex: "100",
						transform: "rotate(45deg)",
						opacity: "0.7",
					}}
				>
					<Icon>add</Icon>
				</IconButton>
				<GridList cellHeight={200} spacing={1} className={classes.gridList}>
					{props.project.images.map((tile) => (
						<GridListTile
							// key={project.id}
							// cols={tile.featured ? 2 : 1}
							// rows={tile.featured ? 2 : 1}
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
