import processing.core.PApplet;

public class Sketch extends PApplet{
    private Ball ball;
    private Ground ground;
    public static void main(String[] args) {
        String[] processingArgs = {"Sketch"};
        Sketch sketch = new Sketch();
        PApplet.runSketch(processingArgs,sketch);
    }

    @Override
    public void settings() {
        size(400,400);
    }

    public void setup() {
        ball = new Ball();
        ground = new Ground();
    }
    
    public void draw() {
        background(220);
        ball.tick();
        ball.draw(g);
    }


}
