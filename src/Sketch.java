import java.time.chrono.ThaiBuddhistEra;

import processing.core.PApplet;

public class Sketch extends PApplet{
    public static void main(String[] args) {
        String[] processingArgs = {"Sketch"};
        Sketch sketch = new Sketch();
        PApplet.runSketch(processingArgs,sketch);
    }

    @Override
    public void settings() {
        size(400,400);
    }
}
