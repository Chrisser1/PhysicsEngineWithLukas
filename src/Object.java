import java.util.ArrayList;

import processing.core.PGraphics;

/**
 * Objekt
 */
public abstract class Object {
  protected final Vector[] pos;

  protected int radius;
  
  protected Vector velocity;
  protected Vector acceleratuion;

  public final int mass = 10;
  protected int color;


  ArrayList<Addons> addons = new ArrayList<Addons>();

  public Object(Vector[] pos, Addons[] addons, int color) {
    this.pos = pos;
      velocity = new Vector(0f, 0f);
      acceleratuion = new Vector(0f,0f);

      for(int i = 0; i < addons.length; i++) {
        this.addons.add(addons[i]);
        this.addons.get(i).setup(this);
      }
  }
  
  public void tick(Object[] objects) {
    updatePos();
    updateAddons(objects);
  };

    protected void updatePos() {
        velocity.add(acceleratuion);
        for(int i = 0; i < pos.length; i++) {
        pos[i].add(velocity);
        }
        // System.out.println(pos[0].getCoords());
    }

  protected void updateAddons(Object[] objects) {
    for(Addons addon: addons) {
      addon.tick(this,objects);
    }
  }

  public int getRadius() {
      return radius;
  }

  public abstract void draw(PGraphics g);
}