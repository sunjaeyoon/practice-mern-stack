import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 750,
    height: 1000,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function NestedGrid() {
  const classes = useStyles();
  const [image, setImage] = useState([]);
  
  useEffect(() => {
    const getData = () => {
      fetch("https://www.reddit.com/r/wallpaper/new.json?count=25")
      .then(response=>response.json())
      .then(data=>{
        setImage(data);
        console.log(data)
      })
    };
    getData();
  }, [])

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} rows={6} style={{ height: 'auto' }}>
          <ListSubheader component="div">Images</ListSubheader>
        </GridListTile>
        {image.data.children.map((tile) => (
          <GridListTile rows={3} key={tile.data.thumbnail}>
            <img src={tile.data.url} alt={tile.data.thumbnail} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}