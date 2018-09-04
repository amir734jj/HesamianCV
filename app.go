package main

import (
	"github.com/labstack/echo"
	"os"
	"fmt"
)


func main() {
	port := os.Getenv("PORT")

	if len(port) == 0 {
		port = fmt.Sprint(5000)
	}

	e := echo.New()

	e.Static("/static", "static")
	e.Static("/img", "img")
	e.Static("/files", "files")

	e.GET("/", func(c echo.Context) error {
		return c.File("index.html")
	})
	e.Logger.Fatal(e.Start(":" + port))
}