/**
 * Vector
 */
public class Vector {
    private double x;
    private double y;

    /**
    * Denne funktion bliver kørt når objektet bliver køret
    */
    public Vector(double x,double y) {
        this.x = x;
        this.y = y;
    }

    /**
    * Denne funktion bliver kørt når objektet bliver køret, hvis input er en vector
    */
    public Vector(Vector vector) {
        this.x = vector.getX();
        this.y = vector.getY();
    }

    public void add(Vector vector) {
        this.x += vector.getX();
        this.y += vector.getY();
    }

    public void divide(Double value) {
        this.x = this.x / value;
        this.y = this.y / value;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public String getCoords() {
        return "X: " + x + " | " + "Y: " + y;
    }

    public double sum() {
        return x+y; 
    }
}