/**
 * Vector
 */
public class Vector {
    private float x;
    private float y;

    /**
    * Denne funktion bliver kørt når objektet bliver køret
    */
    public Vector(float x, float y) {
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

    public void divide(float value) {
        this.x = this.x / value;
        this.y = this.y / value;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public String getCoords() {
        return "X: " + x + " | " + "Y: " + y;
    }

    public float sum() {
        return x+y; 
    }

    public void set(float x, float y) {
        this.x = x;
        this.y = y;
    }
    // Get the lenght of a 2D vector
    public float length() {
        return (float) Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    }
}