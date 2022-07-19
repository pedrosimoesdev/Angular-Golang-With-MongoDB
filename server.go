package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Book - We will be using this Book type to perform crud operations
type Car struct {
	car   string
	model string
	year  string
}

// Connection URI
const uri = "mongodb://root:root@sample.host:27017/?maxPoolSize=20&w=majority"

// Hello returns a greeting for the named person.
func main() {

	server := gin.Default()

	server.GET("/", getRecords)

	server.Run(":3333")
}

func getRecords(c *gin.Context) {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}

	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}

	carsCollection := client.Database("crud").Collection("cars")

	ctx := context.TODO()

	result, err := carsCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	var cars []bson.M
	if err = result.All(ctx, &cars); err != nil {
		log.Fatal(err)
	}

	for result.Next(ctx) {
		log.Println(ctx)
		var document bson.M
		err = result.Decode(&document)
		if err != nil {
			log.Println(err)
		}
		cars = append(cars, document)
	}

	c.JSON(200, gin.H{
		"Results": cars,
	})

	fmt.Println("get Records")

}
