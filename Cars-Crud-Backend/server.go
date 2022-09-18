package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Book - We will be using this Book type to perform crud operations
type Car struct {
	car       string
	model     string
	year      string
	DeleteAt  time.Time
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Connection URI
const uri = "mongodb://root:root@sample.host:27017/?maxPoolSize=20&w=majority"

// Hello returns a greeting for the named person.
func main() {

	server := gin.Default()
	server.Use(cors.Default())

	server.GET("/", getRecords)
	server.POST("/insert", insertRecords)
	server.PUT("/update", updateRecord)
	server.DELETE("/delete", deleteRecord)

	server.Run(":3333")
}

func connection() (*mongo.Client, error) {

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
		return client, err
	}
	return client, err
}

func getRecords(c *gin.Context) {
	con, err := connection()

	if err := con.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}

	carsCollection := con.Database("crud").Collection("cars")

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
		"results": cars,
	})

	fmt.Println("get Records")

}

func insertRecords(c *gin.Context) {
	con, _ := connection()

	collection := con.Database("crud").Collection("cars")

	doc := bson.D{{"name", "name test"}, {"model", "model test"}, {"year", 1974}}
	result, _ := collection.InsertOne(context.TODO(), doc)
	fmt.Printf("Inserted document with _id: %v\n", result.InsertedID)

}

func updateRecord(c *gin.Context) {
	con, _ := connection()

	collection := con.Database("crud").Collection("cars")

	filter := bson.D{{"_id", "6326126058adef8850b1f31a"}}
	replacement := bson.D{{"name", "nameedit"}, {"model", "model edit"}, {"year", 2028}}
	result, _ := collection.ReplaceOne(context.TODO(), filter, replacement)
	fmt.Printf("Documents matched: %v\n", result.MatchedCount)
	fmt.Printf("Documents replaced: %v\n", result.ModifiedCount)

}

func deleteRecord(c *gin.Context) {
	con, _ := connection()

	collection := con.Database("crud").Collection("cars")

	filter := bson.D{{"_id", "6326126058adef8850b1f31a"}}

	result, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents deleted: %d\n", result.DeletedCount)
}
