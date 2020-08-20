# Setup, run and test

## Run `npm install` in the server folder

## start in development mode with: `npm run dev`

## start in prodcution mode with: `npm run start`

## run the tests with `npm run test`

# Game simulation 

## run a game simulation by sending a POST request with a similar payload to: http://localhost:3001/play (assuming the default port in the .env file)
`{
    "boardSize": 4,
    "noOfColors": 3
}`

e.g (Ubuntu 20): 
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "boardSize": 4, "noOfColors": 3 }' \
  http://localhost:3001/play

## The response is an array similar to this: 
"[{"color":"green","positions":[{"x":0,"y":1,"color":"green","visited":false},{"x":0,"y":2,"color":"green","visited":false},{"x":0,"y":0,"color":"green","visited":false},{"x":1,"y":1,"color":"green","visited":false},{"x":1,"y":0,"color":"green","visited":false},{"x":1,"y":2,"color":"green","visited":false},{"x":2,"y":2,"color":"green","visited":false},{"x":0,"y":3,"color":"green","visited":false}]},{"color":"red","positions":[{"x":1,"y":0,"color":"green","visited":false},{"x":1,"y":1,"color":"green","visited":false},{"x":0,"y":1,"color":"green","visited":false},{"x":0,"y":2,"color":"green","visited":false},{"x":1,"y":2,"color":"green","visited":false},{"x":2,"y":2,"color":"green","visited":false},{"x":0,"y":3,"color":"green","visited":false},{"x":0,"y":0,"color":"green","visited":false},{"x":3,"y":2,"color":"green","visited":false},{"x":3,"y":1,"color":"green","visited":false},{"x":3,"y":3,"color":"green","visited":false},{"x":2,"y":3,"color":"green","visited":false}]},{"color":"blue","positions":[{"x":1,"y":0,"color":"green","visited":false},{"x":1,"y":1,"color":"green","visited":false},{"x":0,"y":1,"color":"green","visited":false},{"x":0,"y":2,"color":"green","visited":false},{"x":1,"y":2,"color":"green","visited":false},{"x":2,"y":2,"color":"green","visited":false},{"x":3,"y":2,"color":"green","visited":false},{"x":3,"y":1,"color":"green","visited":false},{"x":3,"y":3,"color":"green","visited":false},{"x":2,"y":3,"color":"green","visited":false},{"x":0,"y":3,"color":"green","visited":false},{"x":0,"y":0,"color":"green","visited":false},{"x":2,"y":0,"color":"green","visited":false},{"x":2,"y":1,"color":"green","visited":false},{"x":1,"y":3,"color":"green","visited":false}]},{"color":"green","positions":[{"x":1,"y":0,"color":"green","visited":false},{"x":2,"y":0,"color":"green","visited":false},{"x":2,"y":1,"color":"green","visited":false},{"x":1,"y":1,"color":"green","visited":false},{"x":0,"y":1,"color":"green","visited":false},{"x":0,"y":2,"color":"green","visited":false},{"x":1,"y":2,"color":"green","visited":false},{"x":2,"y":2,"color":"green","visited":false},{"x":3,"y":2,"color":"green","visited":false},{"x":3,"y":1,"color":"green","visited":false},{"x":3,"y":3,"color":"green","visited":false},{"x":2,"y":3,"color":"green","visited":false},{"x":1,"y":3,"color":"green","visited":false},{"x":0,"y":3,"color":"green","visited":false},{"x":0,"y":0,"color":"green","visited":false},{"x":3,"y":0,"color":"green","visited":false}]}]"

The items in the array have the following meaning:
- the color property is the color that has been played considering the maximum number of tiles that will be covered
- the positions array inside each item represents the coordinates of the tiles covered by that move