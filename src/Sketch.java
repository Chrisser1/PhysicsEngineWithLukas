import processing.core.PApplet;

public class Sketch extends PApplet{
    public static Object[] objects;
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
            var polyPos = new Vector[] {new Vector(6,3), new Vector(9,3), new Vector(10.6f,5.6f), new Vector(9,8.2f), new Vector(6,8.2f), new Vector(4.5f,5.6f)};
        objects = new Object[] {
            new Polygon(polyPos, new Addons[] {new Gravity(),new Collision()}, color(100,100,0), false),
            new Square(new Vector(0,height),new Vector(width,height),new Vector(width,height/4*3+50f), new Vector(0,height/4*3),new Addons[] {},color(0,0,0), true),
            // new Square(new Vector(0,height),new Vector(width,height),new Vector(width,height/4*3-50f), new Vector(0,height/4*3),new Addons[] {},color(0,0,0), true),
            // new Ball(new Vector(10,100),10,new Addons[] {new Gravity(), new Collision()},color(100,100,100)), 
            // new Ball(new Vector(10,100),50,new Addons[] {},color(100,100,100)),
            // new Square(new Vector(10,10), new Vector(100,0), new Vector(100,100), new Vector(0,100), new Addons[] {}, color(100,100,100)),
            // new Square(new Vector(15,15), 20,20, new Addons[] {new Gravity(),new Collision()}, color(123,32,12,50))
        };
    }
    
    public void draw() {
        background(220);
        for(Object object: objects) {
            object.tick(objects);
        }

        for(Object object: objects) {
            object.draw(g);
        }

    }
}
