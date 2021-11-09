import React from "react";
import styled from "styled-components/macro";

import {
  Avatar,
  Button,
  Link,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  CardActionArea,
  Typography as MuiTypography,
} from "@mui/material";
import { AvatarGroup as MuiAvatarGroup } from "@mui/material";
import { spacing } from "@mui/system";
import { useTheme } from "@mui/styles";

export default function CatalogItem(props) {
  const image = props.image
  const title = props.title
  const description = props.description
  const chip = props.chip

  const theme = useTheme()

  const Card = styled(MuiCard)(spacing);

  const CardContent = styled(MuiCardContent)`
    border-bottom: 1px solid ${theme.palette.grey[300]};
    height: 50%;
  `;

  const CardMedia = styled(MuiCardMedia)`
    height: 220px;
  `;

  const Typography = styled(MuiTypography)(spacing);

  const AvatarGroup = styled(MuiAvatarGroup)`
    margin-left: ${theme.spacing(2)};
  `;

  return (
    <Card style={props.active ? { opacity: 1.0, height: "100%" } : { opacity: 0.3, height: "100%" }}>
      <CardActionArea component={Link} href={`/#/app/catalog/product/${props.id}`} disabled={!props.active} style={{ height: "100%" }}>
        {image ? <CardMedia image={image} title={title} /> : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          {chip}

          <Typography mb={4} color="textSecondary" component="p">
            {description}
          </Typography>

          <AvatarGroup max={3}>
            <Avatar alt="Logo" src={props.presets && props.presets.logo} />
          </AvatarGroup>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
